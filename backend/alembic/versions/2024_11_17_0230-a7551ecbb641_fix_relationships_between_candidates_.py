"""Fix relationships between candidates and reports table

Revision ID: a7551ecbb641
Revises: a52209195fb2
Create Date: 2024-11-17 02:30:22.249698

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a7551ecbb641'
down_revision: Union[str, None] = 'a52209195fb2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('report_candidate_association')
    op.add_column('reports', sa.Column('candidate_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'reports', 'candidates', ['candidate_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'reports', type_='foreignkey')
    op.drop_column('reports', 'candidate_id')
    op.create_table('report_candidate_association',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('report_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('candidate_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['candidate_id'], ['candidates.id'], name='report_candidate_association_candidate_id_fkey'),
    sa.ForeignKeyConstraint(['report_id'], ['reports.id'], name='report_candidate_association_report_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='report_candidate_association_pkey'),
    sa.UniqueConstraint('report_id', 'candidate_id', name='idx_unique_report_candidate')
    )
    # ### end Alembic commands ###
