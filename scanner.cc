#include <node.h>
#include <iostream>
#include <string>
#include <utility>
#include <list>
#include <fstream>

using namespace std;


namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Number;
using v8::Context;

void TinyLanguageAnalysis(string longText){
    unsigned int i = 0;
    int number;
    int numberIndex;
    int letterIndex;
    int commentIndex;
    string in;
    ofstream testFile;
    testFile.open ("example.txt");
    list< pair <string, string> > tokens;
    list< pair <string, string> >::iterator it;
        while(i < longText.length()){
            in = longText[i];
            if(in == " " || in == "}"){
                i++;
            }
            else if(isalpha(in[0])){
                bool error_flag = false;
                letterIndex = i + 1;
                while(isalpha(longText[letterIndex])){
                    in += longText[letterIndex];
                    letterIndex++;
                }
                while(isdigit(longText[letterIndex]) && isalpha(longText[letterIndex+1])) {
                    in += longText[letterIndex];
                    letterIndex++;
                    error_flag = true;
                }
                while(error_flag && isalpha(longText[letterIndex])) {
                    in += longText[letterIndex];
                    letterIndex++;
                }
                while(isdigit(longText[letterIndex])) {
                    in += longText[letterIndex];
                    letterIndex++;
                    error_flag = true;
                }

                if(in == "if"){
                    tokens.push_back(make_pair(in, "IF"));
                }
                else if(in == "read"){
                    tokens.push_back(make_pair(in, "READ"));
                }
                else if(in == "repeat"){
                    tokens.push_back(make_pair(in, "REPEAT"));
                }
                else if(in == "write"){
                    tokens.push_back(make_pair(in, "WRITE"));
                }
                else if(in == "end"){
                    tokens.push_back(make_pair(in, "END"));
                }
                else if(in == "else"){
                    tokens.push_back(make_pair(in, "ELSE"));
                }
                else if(in == "until"){
                    tokens.push_back(make_pair(in, "UNTIL"));
                }
                else if(in == "then"){
                    tokens.push_back(make_pair(in, "THEN"));
                }
                else if(error_flag) {
                    string error = in + " is undefined";
                    tokens.push_back(make_pair("Error", error));
                }
                else{
                    tokens.push_back(make_pair(in, "IDENTIFIER"));
                }
                i = letterIndex;
            }
            else if(isdigit(in[0])){
                numberIndex = i + 1;
                bool errorFlag = false;
                while(isdigit(longText[numberIndex])){
                    in += longText[numberIndex];
                    numberIndex++;
                } //2z2z
                while(isalpha(longText[numberIndex]) && isdigit(longText[numberIndex+1])) {
                    in += longText[numberIndex];
                    numberIndex++;
                    errorFlag = true;
                }
                while(errorFlag && isdigit(longText[numberIndex])) {
                    in += longText[numberIndex];
                    numberIndex++;
                }
                while(isalpha(longText[numberIndex])) {
                    in += longText[numberIndex];
                    numberIndex++;
                    errorFlag = true;
                }
                if(errorFlag){
                    string error = in + " is undefined";
                    tokens.push_back(make_pair("Error", error));
                } else {
                    tokens.push_back(make_pair(in, "NUMBER"));
                }
                i = numberIndex;
            }

            else if(in == ":" && longText[++i] == '='){
                tokens.push_back(make_pair((in+longText[i++]) , "ASSIGN"));
                i++;
            }
            else if(in == "+"){
                tokens.push_back(make_pair(in, "PLUS"));
                i++;
            }
            else if(in == "-"){
                tokens.push_back(make_pair(in, "MINUS"));
                i++;
            }
            else if(in == "{"){
                in = longText[++i];
                commentIndex = i + 1;
                while(longText[commentIndex] != '}'){
                    in += longText[commentIndex];
                    commentIndex++;
                }
                tokens.push_back(make_pair(in, "COMMENT"));
                i = commentIndex;
            }

            else if(in == "(") {
                tokens.push_back((make_pair(in,"OPENBRACKET")));
                i++;
            }

            else if(in == ")") {
                tokens.push_back(make_pair(in,"CLOSEDBRACKET"));
                i++;
            }

            else if(in == "*"){
                tokens.push_back(make_pair(in, "MULT"));
                i++;
            }
            else if(in == "/"){
                tokens.push_back(make_pair(in, "DIV"));
                i++;
            }
            else if(in == ";"){
                tokens.push_back(make_pair(in, "SEMI"));
                i++;
            }
            else if(in == ">"){
                tokens.push_back(make_pair(in, "GREATERTHAN"));
                i++;
            }
            else if(in == "<"){
                tokens.push_back(make_pair(in, "LESSTHAN"));
                i++;
            }
            else if(in == "="){
                tokens.push_back(make_pair(in, "EQUAL"));
                i++;
            }
            else if (in != "/n") {
                string error = in + " is undefined";
                tokens.push_back(make_pair("Error", error));
                i++;
            }
    }

    for(it = tokens.begin(); it != tokens.end(); ++it){
        if(it->first == "Error"){
            testFile << it->first<< ","<<it->second<< ",";
            //testFile.close();
        }
        else{
            testFile << it->first<< ","<<it->second<<",";
        }
    }
    testFile.close();
}

void printString(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  v8::String::Utf8Value str(isolate, args[0]);
  std::string cppStr(*str);

  TinyLanguageAnalysis(cppStr);
    // v8::Local<v8::String> v8String = v8::String::NewFromUtf8(isolate, cppStr.c_str(), v8::String::kNormalString);

  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "done", NewStringType::kNormal).ToLocalChecked());
}


void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "printString", printString);
}

NODE_MODULE(scanner, Initialize)

}  // namespace demo