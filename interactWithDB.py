# Handles all requests and sends to the database
from contextlib import closing
from flask import Flask, request, jsonify
from flask_cors import CORS
# ^ handles python running in seperate environment to app
import sqlite3

app = Flask(__name__)
CORS(app)


def add_brand(name):
  # Function to allow the user to add a brand to the Brands TABLE
  with closing(sqlite3.connect("database.db")) as connection:
    with closing(connection.cursor()) as cursor:
      cursor.execute("INSERT INTO Brands VALUES (?)", (name,))
      connection.commit()

@app.route("/add-brand", methods=["POST"])
def addBrand():
  brandName = request.json.get("brandName")
  result = add_brand(brandName)
  return jsonify(result)


def remove_brand(name):
  # Function to allow the user to remove a brand from the Brands TABLE
  with closing(sqlite3.connect("database.db")) as connection:
    with closing(connection.cursor()) as cursor:
      cursor.execute("DELETE FROM Brands WHERE Name=(?)", (name,))
      connection.commit()

@app.route("/remove-brand", methods=["POST"])
def removeBrand():
  brandName = request.json.get("brandName")
  result = remove_brand(brandName)
  return jsonify(result)


def add_exercise(name, primaryMuscle, secondaryMuscle):
  # Function to allow the user to add an exercise to the Exercises TABLE
  with closing(sqlite3.connect("database.db")) as connection:
    with closing(connection.cursor()) as cursor:
      # Calculate new id
      id = cursor.execute("SELECT COUNT(*) FROM Exercises").fetchall() + 1
      if secondaryMuscle:
        cursor.execute("INSERT INTO Exercises VALUES (?, ?, ?, ?)", (id, name, primaryMuscle, secondaryMuscle))
      else:
        cursor.execute("INSERT INTO Exercises (id, Name, PrimaryMuscle) VALUES (?, ?, ?)", (id, name, primaryMuscle))
      connection.commit()

@app.route("/add-exercise", methods=["POST"])
def addExercise():
  name = request.json.get("name")
  result = add_exercise(name)
  return jsonify(result)


def get_muscles():
  # Function to access and return the entirety of the Muscles database
  with closing(sqlite3.connect("database.db")) as connection:
    with closing(connection.cursor()) as cursor:
      rows = cursor.execute("SELECT * FROM Muscles").fetchall()

      data = []
      for row in rows:
        item = {
          'title': row[0],
          'image': row[1]
        }
        data.append(item)

  return data;

@app.route("/get-muscles", methods=["GET"])
def getMuscles():
  muscles = get_muscles()
  return jsonify(muscles)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)