#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>

const char* ssid = "SSID";
const char* password = "SSID_PASS";

bool isBuzzerBuzzing = false;

WebServer server(80);

const int led = 2;
const int buzzer = 21;


void handleRoot() {
  digitalWrite(led, 1);
  server.send(200, "text/plain", "Phy project Proof of concept by Yashraj, Vishwesh and Harshal.");
  digitalWrite(led, 0);
}

void handleNotFound() {
  digitalWrite(led, 1);
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(led, 0);
}

void setup(void) {
  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
  digitalWrite(led, 0);

  pinMode(buzzer, INPUT_PULLUP);

  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("phyproj")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);

  server.on("/inline", []() {
    server.send(200, "text/plain", "this works as well");
  });

  server.on("/status", []() {
    server.send(200, "text/plain", BoolToString(isBuzzerBuzzing));
  });

  server.onNotFound(handleNotFound);
  server.begin();
  Serial.println("HTTP server started");
}

inline const char* const BoolToString(bool b) {
  return b ? "true" : "false";
}


void loop(void) {
  server.handleClient();
  delay(2);  //allow the cpu to switch to other tasks
  int buzzerIO = digitalRead(buzzer);
  if (buzzerIO == 1) {
    digitalWrite(led, HIGH);
    digi
    isBuzzerBuzzing = true;
  } else {
    digitalWrite(led, 0);
    isBuzzerBuzzing = false;
  }
}
