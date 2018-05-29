"""empty message

Revision ID: 0647f1fbe4a8
Revises: e140cc907c8e
Create Date: 2018-05-09 13:27:11.796209

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0647f1fbe4a8'
down_revision = 'e140cc907c8e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('resource_id', sa.Integer(), nullable=True),
    sa.Column('institution_id', sa.Integer(), nullable=True),
    sa.Column('viewable', sa.Boolean(), nullable=True),
    sa.Column('available', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['institution_id'], ['institution.id'], ),
    sa.ForeignKeyConstraint(['resource_id'], ['resource.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('availability')
    # ### end Alembic commands ###