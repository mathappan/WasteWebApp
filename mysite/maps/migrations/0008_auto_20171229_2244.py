# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-12-29 22:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0007_operatorsdata'),
    ]

    operations = [
        migrations.RenameField(
            model_name='operatorsdata',
            old_name='quarter_operators_report',
            new_name='period',
        ),
    ]
