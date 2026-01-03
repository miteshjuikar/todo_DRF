from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import SubTask
from todo_app.models import Task
from .serializers import SubTaskSerializer, TaskWithSubTasksSerializer

@api_view(['GET'])
def get_all_subtasks(request):
    subtasks = SubTask.objects.all()
    serializer = SubTaskSerializer(subtasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_subtask(request, pk):
    try:
        subtask = SubTask.objects.get(pk=pk)
    except SubTask.DoesNotExist:
        return Response({'error': 'SubTask not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = SubTaskSerializer(subtask)
    return Response(serializer.data)

@api_view(['POST'])
def create_subtask(request):
    serializer = SubTaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'SubTask created successfully', 'subtask': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_subtask(request, pk):
    try:
        subtask = SubTask.objects.get(pk=pk)
    except SubTask.DoesNotExist:
        return Response({'error': 'SubTask not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SubTaskSerializer(subtask, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def partial_update_subtask(request, pk):
    try:
        subtask = SubTask.objects.get(pk=pk)
    except SubTask.DoesNotExist:
        return Response({'error': 'SubTask not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SubTaskSerializer(subtask, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_subtask(request, pk):
    try:
        subtask = SubTask.objects.get(pk=pk)
    except SubTask.DoesNotExist:
        return Response({'error': 'SubTask not found'}, status=status.HTTP_404_NOT_FOUND)
    
    subtask.delete()
    return Response({'message': 'SubTask deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_all_tasks_with_subtasks(request):
    tasks = Task.objects.all()
    serializer = TaskWithSubTasksSerializer(tasks, many=True)
    return Response(serializer.data)