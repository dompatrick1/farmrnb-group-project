from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField, SubmitField
from wtforms.validators import DataRequired

class NewReservationForm(FlaskForm):
    userId = IntegerField('userId', [DataRequired()])
    farmId = IntegerField('farmId', [DataRequired()])
    startDate = DateField('startDate', [DataRequired()])
    endDate = DateField('endDate', [DataRequired()])
    submit = SubmitField("Submit")
