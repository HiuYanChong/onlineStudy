<!DOCTYPE html>
<html lang="en">
<head id="head">
  {% block head %}
  <meta charset="utf-8"/>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="format-detection" content="telephone=no, email=no" />
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="HandheldFriendly" content="true">
  <meta name="MobileOptimized" content="320">
  <meta name="screen-orientation" content="portrait">
  <meta name="x5-orientation" content="portrait">
  <meta name="msapplication-tap-highlight" content="no">
  {% endblock %}
</head>
<body>
<div id="body">
  <script src="http://localhost:8080/dist/vendor.js"></script>
  {% block info %}
  {% endblock %}
  <div id="app">
  {% block app %}
  {% endblock %}
  </div>
</div>
</body>
</html>