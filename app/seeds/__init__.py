from flask.cli import AppGroup
from .users import seed_users, undo_users
from .farms import seed_farms, undo_farms
from .reviews import seed_reviews, undo_reviews
from .reservations import seed_reservations, undo_reservations
from .images import seed_images, undo_images

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_farms()
    seed_reviews()
    seed_reservations()
    seed_images()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_farms()
    undo_reviews()
    undo_reservations()
    undo_images()
    # Add other undo functions here
