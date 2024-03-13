import requests, json
from django.conf import settings

def recaptchaCheck(token):
  params = {
    'response': token,
    'secret': settings.RECAPTCHA_SECRET_KEY
  }
  reCAPCTHA_response = requests.post('https://www.google.com/recaptcha/api/siteverify', params=params).json()
  if reCAPCTHA_response['success'] == False:
    return False
  else:
    return True
