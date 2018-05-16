"""empty message

Revision ID: e140cc907c8e
Revises: 2878a30ac3d1
Create Date: 2018-05-08 16:29:23.450635

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e140cc907c8e'
down_revision = '2878a30ac3d1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('resource', sa.Column('owner', sa.String(), nullable=True))
    op.add_column('resource', sa.Column('website', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('resource', 'website')
    op.drop_column('resource', 'owner')
    # ### end Alembic commands ###
