# Handles all requests and sends to the database
from contextlib import closing
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json



app = Flask(__name__)
CORS(app)


def create_tables():
  # Function to create all tables used in the app
  with closing(sqlite3.connect("database.db")) as connection:
    with closing(connection.cursor()) as cursor:
      # Muscles table
      cursor.execute("CREATE TABLE IF NOT EXISTS Muscles (\
                     id INTEGER PRIMARY KEY AUTOINCREMENT,\
                     name TEXT NOT NULL UNIQUE,\
                     image_path TEXT NOT NULL)")
      # Exercises table
      # Primary muscle is the id of the muscles from Muscles table
      # Secondary muscles are a list of those id's
      cursor.execute("CREATE TABLE IF NOT EXISTS Exercises (\
                     id INTEGER PRIMARY KEY AUTOINCREMENT,\
                     name TEXT NOT NULL UNIQUE,\
                     primary_muscle INTEGER,\
                     secondary_muscles TEXT,\
                     single_arm BOOLEAN NOT NULL CHECK (single_arm IN (0, 1)),\
                     FOREIGN KEY (primary_muscle) REFERENCES Muscles(id))")

@app.route("/get-muscles", methods=["GET"])
def get_muscles():
  # Function to access and return the entirety of the Muscles database
  with closing(sqlite3.connect("database.db")) as connection:
    with closing(connection.cursor()) as cursor:
      rows = cursor.execute("SELECT * FROM Muscles").fetchall()

      data = []
      for row in rows:
        item = {
          'id': row[0],
          'name': row[1],
          'image_path': row[2]
        }
        data.append(item)
  return jsonify(data);


@app.route("/add-exercise", methods=["POST"])
def add_exercise():
  data = request.get_json()

  exercise_name = data.get("exerciseName")
  primary_muscle = data.get("primaryMuscle")
  secondary_muscles = data.get("secondaryMuscles", [])
  single_arm = int(data.get("isSwitchOn", False))

  secondary_muscles_str = json.dumps(secondary_muscles) if secondary_muscles else ""

  if not exercise_name or not primary_muscle:
    return jsonify({"error": "Exercise name and primary muscle are required"}), 400
  try:
    with closing(sqlite3.connect("database.db")) as connection:
      with closing(connection.cursor()) as cursor:
        if secondary_muscles:
          cursor.execute("INSERT INTO Exercises (name, primary_muscle, secondary_muscles, single_arm) VALUES (?, ?, ?, ?)",\
                         (exercise_name, primary_muscle, secondary_muscles, single_arm))
        else:
          cursor.execute("INSERT INTO Exercises (name, primary_muscle, single_arm) VALUES (?, ?, ?)",\
                         (exercise_name, primary_muscle, single_arm))
        connection.commit()
    return jsonify({"status": "success", "message": "Exercise added successfully"})
  except Exception as e:
    # Return an error message as JSON
    return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == "__main__":
  create_tables()
  app.run(debug=True, host="0.0.0.0", port=5000)