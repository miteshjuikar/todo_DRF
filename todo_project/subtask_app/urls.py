from django.urls import path
from .views import (
    get_all_subtasks,
    get_subtask,
    create_subtask,
    update_subtask,
    partial_update_subtask,
    delete_subtask,
    get_all_tasks_with_subtasks
)

urlpatterns = [
    path('subtasks/', get_all_subtasks, name='get_all_subtasks'),
    path('subtasks/<int:pk>/', get_subtask, name='get_subtask'),
    path('subtasks/create/', create_subtask, name='create_subtask'),
    path('subtasks/update/<int:pk>/', update_subtask, name='update_subtask'),
    path('subtasks/partial/<int:pk>/', partial_update_subtask, name='partial_update_subtask'),
    path('subtasks/delete/<int:pk>/', delete_subtask, name='delete_subtask'),
    path('subtasks/tasks-with-subtasks/', get_all_tasks_with_subtasks, name='get_all_tasks_with_subtasks'),
]
