from flask import Flask, jsonify, flash, redirect, render_template, request, session, url_for
import json

# configure application
app = Flask(__name__)
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/articles/barreling-towards-the-nuclear-cliff")
def article():

    return render_template("barreling-towards-the-nuclear-cliff.html")

@app.route("/us.json")
def usjson():

    with open('mapTutorial/build/us.json') as json_data:
        d = json.load(json_data)
    return jsonify(d)

@app.route("/map")
def map():
    return render_template("map.html")
