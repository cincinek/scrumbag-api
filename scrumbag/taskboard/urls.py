from rest_framework import routers
from .viewsets import *
from django.urls import path, include


router = routers.DefaultRouter()
router.register("api/taskboard", TaskboardAPI, "taskboard")
router.register("api/stage", StageAPI, "stage")
router.register("api/task", TaskAPI, "task")
router.register("api/role", RoleAPI, "role")
router.register("api/members", MemberAPI, "members")
router.register("api/assignment", AssignmentAPI, "assignment")
router.register("api/comments", CommentAPI, "comment")
router.register("api/meeting", AssignmentAPI, "meeting")

urlpatterns = []


urlpatterns += router.urls
