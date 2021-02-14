from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from django.core import serializers
from .serializers import *
from django.apps import apps
from django.contrib.auth.models import User


class TaskboardAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskboardSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        taskboard = serializer.save()
        member = Member(member=taskboard.owner, taskboard=taskboard.id)
        return taskboard

    def get_queryset(self):
        """Returns taskboard"""
        taskboard_id = self.request.data["taskboard_id"]
        queryset = Taskboard.objects.get(id=taskboard_id)
        return queryset


class BoardListAPI(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TaskboardSerializer

    def get_queryset(self):
        """Returns boards with membership"""

        owner_id = self.request.query_params.get("owner_id")
        queryset = Taskboard.objects.filter(owner=owner_id)
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
        """Returns tasks"""
        board_id = self.request.query_params.get("board_id")
        queryset = Task.objects.filter(taskboard=board_id)
        return queryset


class TaskUpdateAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        new_stage = self.request.data["stage"]
        task_id = self.request.data["id"]
        task = Task.objects.get(id=task_id)
        task.stage = new_stage
        task.save()
        print(task_id)
        print(new_stage)
        return Response({"updated": True}, 200)


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


class MemberOfAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request):
        """Returns taskboards that user is member of"""
        member_id = self.request.query_params.get("member_id")
        queryset = Member.objects.filter(member=member_id)
        boards = []
        for el in queryset:
            board = {
                "name": el.board.name,
                "id": el.board_id,
                "description": el.board.description,
            }
            boards.append(board)
        return Response(boards)


class AssignmentAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AssignmentSerializer

    def post(self, request, *args, **kwargs):
        user_id = User.objects.get(username=request.data["login"]).id
        profile = apps.get_model("accounts", "Profile")
        assignee = profile.objects.get(user_id=user_id)
        task = Task.objects.get(id=request.data["task"])
        data = {"assignee": assignee, "task": task}
        new_assignment = Assignment()
        new_assignment.assignee = assignee
        new_assignment.task = task
        new_assignment.save()
        return Response(
            {
                "name": request.data["login"],
                "id": new_assignment.id,
                "task": request.data["task"],
            }
        )


class AssignListAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request):
        """Returns assignments"""
        task_id = self.request.query_params.get("task_id")
        queryset = Assignment.objects.filter(task=task_id)
        ass_list = []
        for el in queryset:
            ass = {"name": el.assignee.user.username, "id": el.id}
            print(ass)
            ass_list.append(ass)
        return Response(ass_list)


class CommentAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        name = comment.comment_by.user.username
        com = {
            "commented_by": name,
            "text": request.data["text"],
            "id": comment.id,
        }
        return Response(com)

    def get(self, request):
        """Returns comments"""
        task_id = self.request.query_params.get("task_id")
        queryset = Comment.objects.prefetch_related("task", "comment_by").filter(
            task=task_id
        )
        comments = []
        for el in queryset:
            com = {
                "commented_by": el.comment_by.user.username,
                "text": el.text,
                "id": el.id,
            }
            print(com)
            comments.append(com)
        return Response(comments)


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
        meeting_id = self.request.query_params.get["meeting_id"]
        queryset = Meeting.objects.select_related("taskboard").get(id=meeting_id)
        return queryset.url
