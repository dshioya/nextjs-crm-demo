'use client'

import {useRouter} from 'next/navigation'
import {Box, Button, Typography} from '@mui/material'
import {Formik, Form, Field} from 'formik'
import {TextField} from 'formik-mui';
import styles from './page.module.css'

type FormValues = {
  loginId: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter()

  const initialValues = {
    loginId: '',
    password: ''
  }

  /**
   * フォームsuccessイベント時の処理。
   *
   * @param data フォーム値
   */
  function onSuccessForm(data: FormValues) {
    console.log('onSuccessForm call.', data)
  }

  /**
   * アカウント作成ボタンclickイベント時の処理。
   */
  function onClickSignupButton() {
    router.push('/signup')
  }

  return (
    <Formik initialValues={initialValues}
            onSubmit={onSuccessForm}>
      {({submitForm, isSubmitting}) => (
        <Form>
          <Box className={styles.form}>
            <Box component="h1"
                 className={styles.title}>顧客管理システム</Box>
            <Typography className={styles.description}>デモ版</Typography>
            <Typography className={styles.description}>ログイン</Typography>
            <Field component={TextField}
                   name="loginId"
                   label="ログインID"/>
            <Field component={TextField}
                   name="password"
                   type="password"
                   label="パスワード"/>
            <Button variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}>ログイン</Button>
            <Button onClick={onClickSignupButton}>アカウント作成</Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
