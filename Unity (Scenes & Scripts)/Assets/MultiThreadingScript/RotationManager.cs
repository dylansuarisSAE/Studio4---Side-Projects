using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Threading;

public class RotationManager : MonoBehaviour
{
    [SerializeField] GameObject[] Set1;
    [SerializeField] GameObject[] Set2;


    public float zAxis = 0.5f;
    public int RotationSpeed =  5;

    public Vector3 Set1rotation;
    public Vector3 Set2rotation;

    private void Start()
    {
        Thread mainThread = Thread.CurrentThread;
                                                    // mainThread.Name = "Main Thread";
                                                    //Debug.Log(mainThread.Name);
        Thread Set1Thread = new (RotateSet1);
        Thread Set2Thread = new (RotateSet2);

        Set1Thread.Start();
        Set2Thread.Start();

        Debug.Log(mainThread.Name + " is Complete!");

    }
    private void Update()
    {
        for(int i = 0; i < Set1.Length; i++)
        {
            Set1[i].transform.rotation = Quaternion.Euler(Set1rotation);
            Debug.Log("Rotating Set 1");

        }

        for (int i = 0; i < Set2.Length; i++) //Rotating Set 2 Array of GameObjects
        {
            Set2[i].transform.rotation = Quaternion.Euler(Set2rotation);

            
            Debug.Log("Rotating Set 2");
        }
    }
    //A thread is an Excecution Path of a program, we can use multiple threads to perform different tasks of our program at the same time

  
    void RotateSet1()
    {
        int i = 0;

        while (i < 1000)
        {
            Set1rotation = new Vector3(0, 0, i++);
            Thread.Sleep(20);
        }

        Debug.Log("Finished Rotating Set 1 Objects");


    }

   void RotateSet2()
    {

        int i = 0;

        while (i > -1000)
        {
            Set2rotation = new Vector3(0, 0, i--);
            Thread.Sleep(20);
        }

        Debug.Log("Finished Rotating Set 2 Objects");

    } 
}