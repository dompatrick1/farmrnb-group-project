"""empty message

Revision ID: d5296e2e727d
Revises: ffdc0a98111c
Create Date: 2021-04-25 18:52:21.196190

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd5296e2e727d'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('image', sa.String(), nullable=True))
    op.add_column('users', sa.Column('isHost', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'isHost')
    op.drop_column('users', 'image')
    # ### end Alembic commands ###