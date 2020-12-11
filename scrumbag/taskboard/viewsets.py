from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from .serializers import *


class TaskboardAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskboardSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        taskboard = serializer.save()
        return taskboard

    def get_queryset(self):
        """Returns taskboard"""
        taskboard_id = self.request.data["taskboard_id"]
        queryset = Taskboard.objects.get(id=taskboard_id)
        return queryset


class StageAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = StageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        stage = serializer.save()
        return stage

    def get_queryset(self):
        """Returns stage"""
        stage_id = self.request.data["stage_id"]
        queryset = Stage.objects.get(id=taskboard_id)
        return queryset


class TaskAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task = serializer.save()
        return task

    def get_queryset(self):
        """Returns task"""
        task_id = self.request.data["task_id"]
        queryset = Task.objects.get(id=task_id)
        return queryset


class RoleAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = RoleSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        role = serializer.save()
        return role

    def get_queryset(self):
        """Returns role"""
        role_id = self.request.data["role_id"]
        queryset = Role.objects.get(id=role_id)
        return queryset


class MemberAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MemberSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        member = serializer.save()
        return member

    def get_queryset(self):
        """Returns members"""
        member_id = self.request.data["member_id"]
        queryset = Member.objects.filter(id=member_id)
        return queryset


class AssignmentAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AssignmentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        assignment = serializer.save()
        return assignment

    def get_queryset(self):
        """Returns assignments"""
        task_id = self.request.data["task_id"]
        queryset = Assignment.objects.prefetch_related("task", "assignee").filter(
            id=task_id
        )
        return queryset


class CommentAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        return comment

    def get_queryset(self):
        """Returns comments"""
        task_id = self.request.data["task_id"]
        queryset = Comment.objects.prefetch_related("task", "comment_by").filter(
            id=task_id
        )
        return queryset


class MeetingAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MeetingSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        meeting = serializer.save()
        return meeting

    def get_queryset(self):
        """Returns meeting url"""
        meeting_id = self.request.data["meeting_id"]
        queryset = Meeting.objects.select_related("taskboard").get(id=meeting_id)
        return queryset.url
