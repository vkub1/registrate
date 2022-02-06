package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Registration struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	PhoneNumber string `json:"phone_number"`
	Age         int    `json:"age"`
	Country     string `json:"country"`
}

type RegistrationDetails struct {
	id           primitive.ObjectID
	FirstName    string
	LastName     string
	RegisteredAt string
}

func registrationHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if r.URL.Path != "/registrants" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}
	var reg Registration
	_ = json.NewDecoder(r.Body).Decode(&reg)
	if reg.FirstName == "" || reg.LastName == "" || (reg.Age < 18 || reg.Age > 99) || (reg.Country == "") {
		http.Error(w, "400 One of the request parameters was invalid", http.StatusBadRequest)
		return
	}
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://registrate_client:Z4CmCMQLkzedAQts@cluster0.2k7ob.mongodb.net/event-app?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	registrateDatabase := client.Database("event-app")
	registrationsCollection := registrateDatabase.Collection("registrations")

	var currentTime = time.Now().Truncate(0)

	registrationResult, err := registrationsCollection.InsertOne(ctx, bson.D{
		{Key: "first_name", Value: reg.FirstName},
		{Key: "last_name", Value: reg.LastName},
		{Key: "phone_number", Value: reg.PhoneNumber},
		{Key: "age", Value: reg.Age},
		{Key: "country", Value: reg.Country},
		{Key: "registered_at", Value: currentTime},
	})
	if err != nil {
		log.Fatal(err)
	}

	data := RegistrationDetails{
		id:           registrationResult.InsertedID.(primitive.ObjectID),
		FirstName:    reg.FirstName,
		LastName:     reg.LastName,
		RegisteredAt: currentTime.String(),
	}
	fmt.Println(data)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(data)

}

func main() {
	http.HandleFunc("/registrants", registrationHandler)
	fmt.Printf("Starting server at port 9000\n")
	if err := http.ListenAndServe(":9000", nil); err != nil {
		log.Fatal(err)
	}

}
