#include <WiFi.h>;

const char* ssid = "WiFi-2.4-BE4E_EXT";
const char* password = "wueyz6dm44f2x";

const int motorPin1 = 12;
const int motorPin2 = 14;

int motorState1 = LOW;
int motorState2 = LOW;

void setup() {
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);

  digitalWrite(motorPin1, motorState1);
  digitalWrite(motorPin2, motorState2);
  
  Serial.begin(115200);
  WiFi.begin(ssid,password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected to the WiFi network");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  

}

void loop() {
  if ((WiFi.status() == WL_CONNECTED)) {
    Serial.println("You can try to ping me");
    if (motorState1 == LOW) {
      motorState1 = HIGH;
      motorState2 = LOW;
      
    }
    else {
      motorState1 = LOW;
      motorState2 = HIGH;
      
    }
    digitalWrite(motorPin1, motorState1);
    digitalWrite(motorPin2, motorState2);
    delay(5000);
  }

  else {
    Serial.println("Connection lost");
  }

}
