from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, Http404

import json

from .models import KeyValuePairModel, PageCounter

# Methods PUT
def count(request):
  data = json.loads(request.body)
  response = {
    'success': False,
    'status': 500,
    'error': 'Unknown error',
  }
  if request.method == 'PUT':
    try:
      try:
        url = PageCounter.objects.get(url=data['url'])
        count = url.hits + 1
        PageCounter.objects.filter(url=data['url']).update(url=data['url'], hits=count)
        response['status'] = 200
        response['error'] = ''
        response['success'] = True
      except ObjectDoesNotExist:
        PageCounter(url=data['url'], hits=1).save()
        response['status'] = 200
        response['error'] = ''
        response['success'] = True
      except Exception as e:
        raise e
    except Exception as e:
      raise e
    finally:
      return JsonResponse(response)
  else:
    response['status'] = 405
    response['error'] = "Method not allowed"
    return JsonResponse(response)


# Methods GET and POST
def itemmany(request):
  response = {
    "success": False,
    "error": 'Unknown error',
    'status': 500,
  }
  if request.method == 'POST':
    data = json.loads(request.body)
    for pair in data:
      if pair['key'] == "key":
        response['error'] = 'Key cannot be "key"'
        response['status'] = 200
        return JsonResponse(response)
      key = pair['key'].strip()
      value = pair['value'].strip()
      try:
        KeyValuePairModel.objects.get(key=key)
        response['error'] = "Key already exists"
      except:
        if key == '' or value == '':
          response['error'] = "Key or value is empty"
          response['status'] = 200
          return JsonResponse(response)
        try:
          content = KeyValuePairModel(key=key, value=value)
          content.save()          
          print()
          response['success'] = True
          response['id'] = content.getid()
          response['key'] = content.getkey()
          response['value'] = content.getvalue()
        except Exception as e:
          print(e)
          response['error'] = "Something went wrong. Try again."
      finally:
        return JsonResponse(response)
  # Method GET
  else:
    keyValuePairs = list(KeyValuePairModel.objects.all().values())
    pageCounterList = list(PageCounter.objects.all().values())
    context = {
      'items': len(keyValuePairs),
      'keyValuePair_list': keyValuePairs,
      'page_count_list': pageCounterList,
    }
    return render(request, 'data.html', context)

# Methods PUT and DELETE
def itemone(request, key, format=None):

  response = {
    'success': False,
    'error': 'Unknown error',
    'status': 500,
  }
  """
  This code is currently not used as editing key/values functionality is disabled. You can enable it yourself if you want however you need to add it to the frontend as well.
  """ 
  # data = json.loads(request.body)
  # reCAPCTHA_response = recaptchaCheck(data['g-recaptcha-response'])
  # if reCAPCTHA_response == False:
  #   response['error'] = "ReCAPTCHA Error"
  #   return JsonResponse(response)

  # if request.method == 'PUT':
  #   data = json.loads(request.body)
  #   if data == False:
  #     response['error'] = "ReCAPTCHA Error"
  #     return JsonResponse(response)
  #   try:
  #     KeyValuePairModel.objects.filter(key=key).update(key=data['newKey'], value=data['newValue'])
  #     response['success'] = True
  #     response['message'] = f'{data["newKey"]} saved!'
  #     response['error'] = ''
  #   except Exception as e:
  #     raise e
  #   finally:
  #     return JsonResponse(response)

  if request.method == 'DELETE':
    try:
      pk = key
      KeyValuePairModel.objects.filter(pk=pk).delete()
      response['error'] = ''
      response['message'] = f'{key} deleted'
      response['status'] = 200
      response['success'] = True
    except KeyValuePairModel.DoesNotExist:
      raise Http404
    finally:
      return JsonResponse(response)
  else:
    response['error'] = 'Method not allowed'
    response['status'] = 405
    return JsonResponse(response)

def getlastitemid(request):
  response = {
    'success': False,
    'error': 'Unknown error',
    'status': 500,
  }
  try:
    id = KeyValuePairModel.objects.last()
    print(id)
    response['success'] = True
    response['status'] = 200
    response['id'] = id
  except Exception as e:
    response['error'] = e
  return JsonResponse(response)