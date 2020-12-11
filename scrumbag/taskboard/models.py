from django.db import models


class Taskboard(models.Model):
    team = models.ForeignKey("accounts.Team", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=250, null=True)


class Stage(models.Model):
    taskboard = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=250, null=True)


class Task(models.Model):
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=250, null=True)
    due_date = models.DateTimeField(auto_now=False, null=True)


class Role(models.Model):
    taskboard = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=False)


class Member(models.Model):
    role = models.ForeignKey(Taskboard, on_delete=models.CASCADE)
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