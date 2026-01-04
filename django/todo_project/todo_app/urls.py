from django.urls import path
from .views import (
    get_all_tasks,
    get_task,
    create_task,
    update_task,
    partial_update_task,
    delete_task
)

urlpatterns = [
    path('tasks/', get_all_tasks, name='get_all_tasks'),
    path('tasks/<int:pk>/', get_task, name='get_task'),
    path('tasks/create/', create_task, name='create_task'),
    path('tasks/update/<int:pk>/', update_task, name='update_task'),
    path('tasks/partial/<int:pk>/', partial_update_task, name='partial_update_task'),
    path('tasks/delete/<int:pk>/', delete_task, name='delete_task'),
]
