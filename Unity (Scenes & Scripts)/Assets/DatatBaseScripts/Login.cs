using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.Networking;
using UnityEngine.UI;

public class Login : MonoBehaviour
{
    [SerializeField] private string serverAuthenticationEndpoint = "http://127.0.0.1:3150/account";


    public TextMeshProUGUI alertText;
    public TMP_InputField usernameInputField;
    public TMP_InputField passwordInputField;
    public Button loginButton;


    public void OnloginClick()
    {

        alertText.text = "Signing in...";
        loginButton.interactable = false;
        StartCoroutine(AttemptLogin()); //wait for the web request to get done
    }


    private IEnumerator AttemptLogin()
    {

        string username = usernameInputField.text; // setting the username to the userNameInputfield in unity
        string password = passwordInputField.text;  // setting the password to the passwordInputfield in unity



        //USERNAME PARAMETERS
        if (username.Length < 3) //check if username is within these parameters
        {
            alertText.text = "Username is too Short";
            loginButton.interactable = true;
            yield break; //to break out of the coroutine
        }
        if(username.Length > 20)
        {
            alertText.text = "Username is too Long!";
            loginButton.interactable = true;
            yield break;
        }

        //PASSWORD PARAMETERS
        if (password.Length < 3) //check if password is within these parameters
        {
            alertText.text = "Password is too short!";
            loginButton.interactable = true;
            yield break ;
        }
        if(password.Length > 20)
        {
            alertText.text = "Password is too long!";
            loginButton.interactable = true;
            yield break;
        }


        UnityWebRequest request = UnityWebRequest.Get($"{serverAuthenticationEndpoint}?rUsername={username}&rPassword={password}"); // get request  //not secure!!!! //post obvilously being secure
        var handler = request.SendWebRequest(); // sends a web request

        float startTime = 0.0f;
        while (!handler.isDone) //
        {
            startTime += Time.deltaTime;

            if (startTime > 10.0f)
            {
                break;
            }

            yield return null;  
        }


        if(request.result == UnityWebRequest.Result.Success) //all this does is check if the webrequest worked (Not if a login is done)
        {
            //check if you are connected and if connected display Username entered


            if (request.downloadHandler.text != "Invalid credentials") // if log-in is a success do...
            {
                loginButton.interactable = false;
                GameAccount returnedAccount = JsonUtility.FromJson<GameAccount>(request.downloadHandler.text);
                alertText.text = "Welcome " + returnedAccount.username + "!";
            }
            else  //if login Fails
            {
                alertText.text = "Invalid credentials";
                loginButton.interactable = true;
            }

        }
        else //if it fails to connect to the Server
        {
            alertText.text = "Unable to Connect to Server...";
            loginButton.interactable = true;
        }

        Debug.Log($"{username} : {password}");


        yield return null;
    }
   
}
