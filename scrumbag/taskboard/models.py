from django.db import models


class Taskboard(models.Model):
    name = models.CharField(max_length=50, null=False)
    owner = models.ForeignKey("accounts.Profile", on_delete=models.CASCADE)
    description = models.CharField(max_length=250, null=True)


class Task(models.Model):
    STAGES = (
        ("b", "Backlog"),
        ("i", "In progress"),
        ("r", "Review"),
        ("c", "Completed"),
    )
    taskboard = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    stage = models.CharField(max_length=1, choices=STAGES)
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=250, null=True)
    due_date = models.DateTimeField(auto_now=False, null=True)


class Member(models.Model):
    board = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    member = models.ForeignKey("accounts.Profile", on_delete=models.CASCADE)


class Assignment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    assignee = models.ForeignKey("accounts.Profile", on_delete=models.CASCADE)


class Comment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    comment_by = models.ForeignKey("accounts.Profile", on_delete=models.CASCADE)
    text = models.CharField(max_length=250, null=False)


class Meeting(models.Model):
    taskboard = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    url = models.URLField(default="http://meet.jit.si/scrumbag_meeting")
    date = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=50, null=False)