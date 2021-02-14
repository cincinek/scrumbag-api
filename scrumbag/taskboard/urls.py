from rest_framework import routers
from .viewsets import *

from django.urls import path, include


router = routers.DefaultRouter()
router.register("api/taskboard", TaskboardAPI, "taskboard")

router.register("api/task", TaskAPI, "task")

router.register("api/members", MemberAPI, "members")
# router.register("api/assignment", AssignmentAPI, "assignment")
# router.register("api/comments", CommentAPI, "comment")
router.register("api/meeting", MeetingAPI, "meeting")
router.register("api/listBoard", BoardListAPI, "boardlist")

# urlpatterns = [path("api/listBoard", BoardListAPI.as_view())]
urlpatterns = [
    path("api/memberOf", MemberOfAPI.as_view()),
    path("api/updateTask", TaskUpdateAPI.as_view()),
    path("api/assignmentList", AssignListAPI.as_view()),
    path("api/assignment", AssignmentAPI.as_view()),
    path("api/comments", CommentAPI.as_view()),
]

urlpatterns += router.urls
