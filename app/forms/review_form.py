from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired


class NewReviewForm(FlaskForm):
    userId = IntegerField('userId', [DataRequired()])
    farmId = IntegerField('farmId', [DataRequired()])
    review = TextAreaField('Content', [DataRequired()])
    rating = IntegerField('Rating', [DataRequired()])
    submit = SubmitField("Submit")
