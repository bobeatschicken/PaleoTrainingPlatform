# Generated by Django 2.1.5 on 2019-11-21 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0005_auto_20191119_2137'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesionimage',
            name='reference_image',
            field=models.BooleanField(default=True),
        ),
    ]
