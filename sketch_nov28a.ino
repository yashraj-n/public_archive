// Importing Libraries

#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>

// Declaring WiFi Password
const char* ssid = "SSID_NAME"
const char* password = "SSID_PASSWORD";

// Global variables
bool isBuzzerBuzzing = false;  // Controls if buzzer is active (if motion detected)
bool isActive = true;          // Is the system active or not

WebServer server(80);  // Starting the web server on port 80 (phyproj.local:80)

// Declaring the pins required
const int buzzer = 21;  // Buzzer Pin
const int led = 22;     // Red LED light Pin
const int PIR = 23;     // IR Sensor Pin


void setup(void) {

  pinMode(led, OUTPUT);        // LED pin to give power (INPUT)
  pinMode(buzzer, OUTPUT);     // Buzzer pin to give power (INPUT)
  pinMode(PIR, INPUT_PULLUP);  // Read readings from PIR (INPUT_PULLUP)

  digitalWrite(led, 0);  // Turning of the LED at start

  Serial.begin(115200);  // starting the serial communication channel between esp and arduino at 115200 baud


  WiFi.mode(WIFI_STA);         // Telling ESP that we want to connect to wifi as client
  WiFi.begin(ssid, password);  // Connecting

  Serial.println("");

  // Waiting for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Telling wifi that phyproj.local is local IP of esp
  if (MDNS.begin("phyproj")) {
    Serial.println("MDNS responder started");
  }

  // Server Endpoints
  // We get request on phyproj.local/<endpoint> and we handle below
  // On handling the request we have to send the status code, encoding and response

  // Sends the status of of alarm (Is the alarm buzzing and is the alarm active)
  server.on("/status", []() {
    String response = BoolToString(isBuzzerBuzzing) + "," + BoolToString(isActive);
    server.send(200, "text/plain", response.c_str());
  });

  // Stops the alarm from buzzing
  server.on("/stop", []() {
    turnOffAlarm();
    server.send(200, "text/plain", "OK");
  });

  // Toggles the alarm on and off
  server.on("/toggle", []() {
    isActive = !isActive;
    String response = BoolToString(isBuzzerBuzzing) + "," + BoolToString(isActive);
    server.send(200, "text/plain", response.c_str());
  });


  // Starting the web server
  server.begin();
  Serial.println("HTTP server started");
}


// Changes Boolean to string
String BoolToString(bool b) {
  return b ? "true" : "false";
}

// We call this function whenever we detect motion
void motionDetected() {
  isBuzzerBuzzing = true;  // Setting the varialble on and Turning on Buzzer and LED
  digitalWrite(led, HIGH);
  digitalWrite(buzzer, HIGH);

  Serial.println("Motion Detected");
}

// Turning Off the buzzing alarm
void turnOffAlarm() {
  isBuzzerBuzzing = false; 

  // The CPU handles processes in parallel in priority order
  // so if we want to stop the buzzer while the buzzer is buzzing
  // we'll have to increase its priority
  // we do it by telling CPU to stop buzzer and by 10 times
  for (int i = 0; i < 10; i++) {
    digitalWrite(led, LOW);
    digitalWrite(buzzer, LOW);
  }
  Serial.println("Alarm Turned Off!");
}


void loop(void) {
  // Starting a parallel server process
  server.handleClient();
  delay(2); // Adding a small delay to allow CPU to finish above calls

  int buzzerIO = digitalRead(PIR); // Pulling INPUT from the buzzer
  
  // Checking if 
  // 1. Motion was detected by buzzer
  // 2. The buzzer is not already buzzing
  // 3. The system is active
  if (buzzerIO == 1 && !isBuzzerBuzzing && isActive) {
    // If yes Then call the motion detected function
  
    motionDetected();
  }
}
