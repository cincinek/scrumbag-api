# Generated by Django 3.1.3 on 2021-01-28 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0007_auto_20210127_2246'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='name',
            field=models.CharField(default='Default', max_length=50),
            preserve_default=False,
        ),
    ]