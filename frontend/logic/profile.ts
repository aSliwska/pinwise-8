export async function deletePin(email: string, token: string | null, pinId : number) {
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/deletePin`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ email: email, id : pinId }),
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