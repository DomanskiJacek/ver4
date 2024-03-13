from django.db import models
from datetime import datetime

# Create your models here.

class TimeStampedModel(models.Model):
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    abstract = True
class KeyValuePairModel(TimeStampedModel):
  key = models.CharField(max_length=100)
  value = models.CharField(max_length=100)

  def __str__(self):
      return self.key
  def getid(self):
      return str(self.id)
  def getkey(self):
      return str(self.key)
  def getvalue(self):
      return str(self.value)  

class PageCounter(models.Model):
  url = models.CharField(max_length=100)
  hits = models.IntegerField()

  def __str__(self):
      return self.url
  