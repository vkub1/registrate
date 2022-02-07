package main

import (
	"bytes"

	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRegistrationHandlerWithCorrectValues(t *testing.T) {
	var jsonData = []byte(`{
		"first_name": "Vladimir",
		"last_name": "Kubliy",
		"phone_number": "9999999",
		"age": 18,
		"country": "Canada"
	}`)
	responseRecorder := httptest.NewRecorder()

	req, err := http.NewRequest("POST", "/registrants", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	if err != nil {
		t.Fatal(err)
	}
	registrationHandler(responseRecorder, req)
	res := responseRecorder.Result()
	defer res.Body.Close()
	if res.StatusCode != http.StatusCreated {
		t.Errorf("handler returned wrong status code: got %v want %v",
			res.StatusCode, http.StatusCreated)
	}
}

func TestRegistrationHandlerWithIncorrectValues(t *testing.T) {
	var jsonData = []byte(`{
		"first_name": "",
		"last_name": "Kubliy",
		"phone_number": "9999999",
		"age": 0,
		"country": "Canada"
	}`)
	responseRecorder := httptest.NewRecorder()

	req, err := http.NewRequest("POST", "/registrants", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	if err != nil {
		t.Fatal(err)
	}
	registrationHandler(responseRecorder, req)
	res := responseRecorder.Result()
	if res.StatusCode != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			res.StatusCode, http.StatusBadRequest)
	}

}

func TestRegistrationHandlerWithWrongMethod(t *testing.T) {
	var jsonData = []byte(`{
		"first_name": "Vladimir",
		"last_name": "Kubliy",
		"phone_number": "9999999",
		"age": 0,
		"country": "Canada"
	}`)
	responseRecorder := httptest.NewRecorder()

	req, err := http.NewRequest("GET", "/registrants", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	if err != nil {
		t.Fatal(err)
	}
	registrationHandler(responseRecorder, req)
	res := responseRecorder.Result()
	if res.StatusCode != http.StatusNotFound {
		t.Errorf("handler returned wrong status code: got %v want %v",
			res.StatusCode, http.StatusNotFound)
	}

}

func TestRegistrationHandlerWithWrongURL(t *testing.T) {
	var jsonData = []byte(`{
		"first_name": "Vladimir",
		"last_name": "Kubliy",
		"phone_number": "9999999",
		"age": 0,
		"country": "Canada"
	}`)
	responseRecorder := httptest.NewRecorder()

	req, err := http.NewRequest("POST", "/registrant", bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")
	if err != nil {
		t.Fatal(err)
	}
	registrationHandler(responseRecorder, req)
	res := responseRecorder.Result()
	if res.StatusCode != http.StatusNotFound {
		t.Errorf("handler returned wrong status code: got %v want %v",
			res.StatusCode, http.StatusNotFound)
	}

}
