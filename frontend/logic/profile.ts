
interface UserProfile {
  gender: string;
  age: number;
  edu: string;
}

export async function deletePin(email: string, token: string | null, pinId : number) {
  console.log(`deletePin?email=${email}&id=${pinId}`);
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/deletePin?email=${email}&id=${pinId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      
        if (response.ok) {
          const data = await response.json();
        } 
        else {
          const errorMessage = await response.text(); 
          console.log(errorMessage);
        }
      } catch (error) {
        console.log("An unexpected error occurred");
      }
}


export async function getUserId(email: string, token: string | null) {
  //console.log(`deletePin?email=${email}&id=${pinId}`);
  console.log(`Find id with email: ${email}`);
    //try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      
        if (response.ok) {
          var userId;
          const data = await response.json();
          //const data_parsed = JSON.parse(data);
          console.log(data);
          for (var i = 0; i < data.length; i++) { 
            if (data[i].email == email){
              userId = data[i].id
            };
          }
          console.log(userId);
          return(userId);
        } 
        else {
          const errorMessage = await response.text(); 
          console.log(errorMessage);
        }
    // } catch (error) {
    //   console.log("An unexpected error occurred");
    // }
}


export async function updateUser(id: number | null, token: string | null, email: string, age: number, gender: string, education: string) {
  //console.log(`deletePin?email=${email}&id=${pinId}`);
  console.log(`Updating user: ${id} with data: ${email}, ${age}, ${gender}, ${education}, `);
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/users/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ email: email, gender: gender, age: age, active: true, education: education, isAdmin: false }),
          }
        );
      
        if (response.ok) {
          const data = await response.json();
        } 
        else {
          const errorMessage = await response.text(); 
          console.log(errorMessage);  
        }
      } catch (error) {
        console.log("An unexpected error occurred");
      }
}

export async function getUserInfo(id: number, token: string | null): Promise<UserProfile> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/users/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const gender: string = data.gender;
      const age: number = data.age;
      const edu: string = data.education;

      return {
        gender,
        age,
        edu,
      };
    } else {
      const errorMessage = await response.text(); 
      console.error(`Error fetching user info: ${errorMessage}`);
      throw new Error(errorMessage); // Reject the promise with an error
    }
  } catch (error) {
    console.error("An unexpected error occurred", error);
    throw error; // Reject the promise with the caught error
  }
}

export async function deleteUser(id: number, token: string | null) {
  //console.log(`deletePin?email=${email}&id=${pinId}`);
  console.log(`Delete user id: ${id} and token: ${token}`);
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/users/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      
        if (response.ok) {
          return;
        } 
        else {
          const errorMessage = await response.text(); 
          console.log(errorMessage);  
        }
      } catch (error) {
        console.log("An unexpected error occurred");
      }
}

export async function updateUserMail(token: string | null, old_email: string, new_email: string, password: string) {
  //console.log(`deletePin?email=${email}&id=${pinId}`);
  console.log(`Updating Email from: ${old_email} to: ${new_email} with ${password}`);
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/change-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ old_email: old_email, new_email: new_email, password: password}),
          }
        );
      
        if (response.ok) {
          const data = await response.json();
          return "Success";
        } 
        else {
          const errorMessage = await response.text(); 
          console.log(errorMessage);  
        }
      } catch (error) {
        console.log("An unexpected error occurred");
      }
}

export async function updateUserPassword(token: string | null, email: string, password: string) {
  //console.log(`deletePin?email=${email}&id=${pinId}`);
  console.log(`Updating password for: ${email} new password: ${password}`);
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/users/change_pass`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ email: email, password: password}),
          }
        );
      
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          return {is_success: "Success"};
        } 
        else {
          const errorMessage = await response.text(); 
          console.log(errorMessage);  
        }
      } catch (error) {
        console.log("An unexpected error occurred");
        console.log(error);
      }
}