"use client";
import Link from "next/link";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Input, Button, ConfigProviderProps, Form } from 'antd';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from "@/components/store";
import { updateUserMail, updateUserPassword } from "../../../../logic/profile";

export default function ProfilePage() {
  const [user, setUser] = useAtom(userAtom);
  const [form_pwd] = Form.useForm();
  const [form_mail] = Form.useForm();
  const [validForm, setValidForm] = useState(false);

  const [emailChangeMessage, setEmailChangeMessage] = useState<string>("");
  const [pwdChangeMessage, setPwdChangeMessage] = useState<string>("");

  const checkIsValidFormPwd = () => {
    const values = form_pwd.getFieldsValue();
    //const isValidEmail = values.email && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email);
    //const isValidName = values.username && values.username.length >= 3;
    const isValidOldPassword = values.oldPassword && values.oldPassword.length >= 8;
    const isValidNewPassword = values.newPassword && values.newPassword.length >= 8;
    const isValidPasswordConfirmation = values.newPassword === values.newPasswordConfirmation;
      setValidForm( isValidOldPassword && isValidNewPassword && isValidPasswordConfirmation );
  }

  const checkIsValidFormMail = () => {
    const values = form_mail.getFieldsValue();
    const isValidEmail = values.email && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email);
    //const isValidName = values.username && values.username.length >= 3;
    const isValidPassword = values.password && values.password.length >= 8;
    //const isValidPasswordConfirmation = values.password === values.passwordConfirmation;
      setValidForm( isValidEmail && isValidPassword );
  }

  const router = useRouter();

  const handleRedirect = () => {
    console.log('Button clicked, redirecting...');
    router.push('/profile/logouts');
  };

  const handleLogout = (_event: any) => {
    setUser((user) => ({ ...user, isAuthenticated: false })); 
    localStorage.removeItem('token');
  }

  var updatedUser = {...user};
  const handleUpdateMail = async () => {
    const token = localStorage.getItem('token');
    const old_email = user.email;
    const values = form_mail.getFieldsValue();
    const new_email = values.email;
    const password = values.password;
    const response = await updateUserMail(token, old_email, new_email, password);
    console.log(response);
    if(response?.is_success === "Success"){
      setEmailChangeMessage("Pomyślnie zmieniono email.")
      console.log(new_email);
      console.log(user);

      updatedUser = { ...user, email: new_email };
      console.log(updatedUser);
      setUser(updatedUser);
      
      console.log(user);
    } else {
      setEmailChangeMessage("Wystąpił błąd.")
    }
    setUser((prevUser) => ({ ...prevUser, email: new_email, }));
  }

  const handleUpdatePwd = async () => {
    const token = localStorage.getItem('token');
    const email = user.email;
    const values = form_pwd.getFieldsValue();
    const password = values.newPassword;
    const old_password = values.oldPassword;
    try {
      const response = await updateUserPassword(token, email, password, old_password);
      console.log('Response:', response); // Log response to inspect its structure
  
      if (response?.is_success === "Success") {
        setPwdChangeMessage("Pomyślnie zmieniono email.");
      } else {
        setPwdChangeMessage("Wystąpił błąd.");
      }
    } catch (error) {
      console.error('Error updating user mail:', error);
      setPwdChangeMessage("Wystąpił błąd. Spróbuj ponownie później.");
    }
  }

    return (
      <main className="flex min-h-full min-w-full flex-col items-center justify-between color-bg-gradient-light-gray">
        <div className="flex min-h-full justify-center color-bg-gradient-dark-gray w-4/6 min-w-[500px] overflow-hidden">
          <div className="pl-10 flex min-h-full w-9/12 min-w-[500px] flex-col">
          <div className="p-4 pt-10 text-5xl font-bold items-left">Mój profil</div>
          <div className="mu-10 h-full flexitems-center justify-center">
          <div className="container mx-auto p-4 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
            <div className="">
                <h2 className="text-xl mb-6">User</h2>
            <div className="h-full">
                <ul className="space-y-0">
                    <li><a href="/profile/pins" className="px-3 flex items-center h-[3rem] text-center border-y-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Moje pineski</a></li>
                    <li><a href="/profile/data" className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Moje dane osobowe</a></li>
                    <li><a href="/profile/settings" className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Ustawienia</a></li>
                    <li><a href="/map" onClick={handleLogout} className="px-3 flex items-center h-[3rem] text-center border-b-2 border-[#4a4a4a] hover:bg-[#4a4a4a] active:bg-gray-600/50">Wyloguj</a></li>
                </ul>
                </div>
            </div>

            <div className="">
                <h2 className="text-xl border-b-2 border-[#404040]">Ustawienia</h2>
    
                <p>Zmień Email</p>
            <Form
        form={form_mail}
        size="small"
        name="chg_mail"
        //labelCol={{ span: 8 }}
        wrapperCol={{ span: 25 }}
        initialValues={{ remember: true }}
        onFieldsChange={checkIsValidFormMail} // Trigger validation check on any field change
      >
        <div className="flex flex-col items-center justify-between gap-4 p-1 rounded-lg text-white">
          <div className="w-full">
            <Form.Item
              //label={<label style={{ color: "white" }}>Zmień Email</label>}
              name="email"
              rules={[
                { required: true, message: "Podaj e-mail" },
                { type: "email", message: "Podaj poprawny e-mail" },
              ]}
              //labelCol={{ span: 18 }}
            >
              <Input
                onChange={(e) => {}}//setEmail(e.target.value)}
                defaultValue={""}
              />
            </Form.Item>
            <Form.Item
              //label={<label style={{ color: "white" }}>Hasło</label>}
              name="password"
              rules={[
                { required: true, message: "Podaj hasło" },
                { min: 8, message: "Hasło musi mieć co najmniej 8 znaków" },
              ]}
              //labelCol={{ span: 18 }}
            >
              <Input.Password onChange={(e) => {}}//setPassword(e.target.value)} 
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-15"
                type="primary"
                htmlType="submit"
                block
                style={{ fontWeight: 700, height: "40px", width: '150px' }}
                disabled={!validForm} // Disable the button if the form is not valid
                onClick={(e) => {
                  if (validForm) {
                    e.preventDefault();
                    handleUpdateMail();
                    handleLogout(null);
                    //setUser((user) => ({ ...user, isAuthenticated: false })); 
                    //localStorage.removeItem('token');
                    //router.push('/map');
                    //router.push('/profile/logouts?mode=EmailChangeconfirmPage');
                    //setMode("personalData");
                  }
                }}
              >
                Zatwierdź
              </Button>
              <p>{emailChangeMessage}</p>
            </Form.Item>
          </div>

         
          
        </div>
      </Form>
      <div className="space-y-2 border-t-2 border-[#404040]">
            
            <p>Zmień hasło</p>
      <Form
        form={form_pwd}
        size="small"
        name="chg_pwd"
        //labelCol={{ span: 8 }}
        wrapperCol={{ span: 25 }}
        initialValues={{ remember: true }}
        onFieldsChange={checkIsValidFormPwd} // Trigger validation check on any field change
      >
        <div className="flex flex-col items-center justify-between gap-4 p-1 rounded-lg text-white">

          <div className="w-full">
          <Form.Item
              //label={<label style={{ color: "white" }}>Hasło</label>}
              name="oldPassword"
              rules={[
                { required: true, message: "Podaj stare hasło" },
                { min: 8, message: "Hasło musi mieć co najmniej 8 znaków" },
              ]}
              //labelCol={{ span: 24 }}
            >
              <Input.Password onChange={(e) => {}}//setPassword(e.target.value)} 
              />
            </Form.Item>
            <Form.Item
              //label={<label style={{ color: "white" }}>Hasło</label>}
              name="newPassword"
              rules={[
                { required: true, message: "Podaj nowe hasło" },
                { min: 8, message: "Hasło musi mieć co najmniej 8 znaków" },
              ]}
              //labelCol={{ span: 24 }}
            >
              <Input.Password onChange={(e) => {}}//setPassword(e.target.value)} 
              />
            </Form.Item>
            <Form.Item
              //label={<label style={{ color: "white" }}>Powtórz hasło</label>}
              name="newPasswordConfirmation"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Potwierdź nowe hasło" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Hasła są różne. Spróbuj ponownie.");
                  },
                }),
              ]}
              //labelCol={{ span: 24 }}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ fontWeight: 700, height: "40px", width: '150px' }}
                disabled={!validForm} // Disable the button if the form is not valid
                onClick={(e) => {
                  if (validForm) {
                    e.preventDefault();
                    //setMode("personalData");
                    handleUpdatePwd();
                  }
                }}
              >
                Zatwierdź
              </Button>
              <p>{pwdChangeMessage}</p>
            </Form.Item>
          </div>
        </div>
      </Form>
          </div>
          <Button
                type="primary"
                htmlType="button"
                color="red"
                block
                style={{ fontWeight: 700, height: "40px", width: '150px' }}
                onClick={handleRedirect}
              >
                Usuń konto
              </Button>
      </div>
        </div>
    </div>
            {/* <div className="grid grid-cols-2 gap-1 p-1">
              <div className="text-white p-6 rounded-lg">Item 1</div>
              <div className="text-white p-6 rounded-lg">Item 2</div>
              <div className="text-white p-6 rounded-lg">Item 3</div>
              <div className="text-white p-6 rounded-lg">Item 4</div>
            </div>
            <form style={{ minWidth: "60%" }}>
              <div className="flex flex-col justify-between gap-12 p-4 rounded-lg text-white">
                
    
                <div className="w-full">
                  <div className="w-full mb-6">
                    <div className="flex justify-between w-full mb-4">
                      <label htmlFor="email" className="text-neutral-300 font-light">
                        Email
                      </label>
                    </div>
                    <Input id="email" type="email" autoFocus={true}/>
                  </div>
                  <div className="self-stretch">
                    <div className="flex justify-between w-full mb-4">
                      <label htmlFor="password" className="text-neutral-300 font-light">
                        Hasło
                      </label>
                      <Link
                        href="/forgot-password"
                        className="font-semibold color-text-teal justify-between"
                      >
                        Zapomniałem/am hasła
                      </Link>
                    </div>
                    <Input id="password" type="password"/>
                  </div>
                </div>
    
                <Button type="primary" size="large" htmlType="submit" block style={{fontWeight: 700}}>
                  Zaloguj
                </Button> */}
              {/* </div>
            </form> */}
          </div>
          </div>
        </div>
      </main>
    );
  }
  