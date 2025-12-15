"""
Database connection and utilities
PostgreSQL with pgvector
"""

import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from typing import Optional

from src.config import settings


class Database:
    """Database connection manager"""

    def __init__(self, connection_string: Optional[str] = None):
        self.connection_string = connection_string or settings.database_url
        self._connection = None

    def connect(self):
        """Establish database connection"""
        if not self._connection or self._connection.closed:
            self._connection = psycopg2.connect(self.connection_string)
        return self._connection

    def close(self):
        """Close database connection"""
        if self._connection and not self._connection.closed:
            self._connection.close()

    @contextmanager
    def get_cursor(self, cursor_factory=None):
        """Context manager for database cursor"""
        conn = self.connect()
        cursor = conn.cursor(cursor_factory=cursor_factory or RealDictCursor)
        try:
            yield cursor
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()

    def execute_migration(self, migration_file: str):
        """Execute SQL migration file"""
        with open(migration_file, 'r') as f:
            sql = f.read()

        with self.get_cursor() as cursor:
            cursor.execute(sql)

        print(f"Migration executed: {migration_file}")


# Global database instance
db = Database()
