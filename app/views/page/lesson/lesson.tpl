{% extends "../../layout/layout.tpl" %}

  {% block head %}
    <link href="http://vjs.zencdn.net/5.19.0/video-js.css" rel="stylesheet">
  {% endblock %}

  {% block info %}
    <div id="lesson-id" style="display: none;">{{ lessonId }}</div>
  {% endblock  %}

  {% block app %}
    <script src="http://localhost:8080/dist/lesson.js"></script>
  {% endblock %}