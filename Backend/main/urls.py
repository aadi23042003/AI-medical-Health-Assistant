from django.urls import path

from . import views


urlpatterns = [
    path('analytics/', views.AnalyticsView.as_view(), name='analytics'),
]