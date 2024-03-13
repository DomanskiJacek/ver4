from django.urls import path, include

urlpatterns = [
    path('', include('key_value_store.urls'))
]
