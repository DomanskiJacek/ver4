from django.urls import path
from . import views

# API endpoints

urlpatterns = [
  path('item/<key>', views.itemone, name='itemone'),
  path('count', views.count, name='count'),
  path('', views.itemmany, name='itemmany'),
]