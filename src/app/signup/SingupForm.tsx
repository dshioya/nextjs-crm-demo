'use client'

import {Box, Button, Typography} from '@mui/material'
import {Formik, Form, Field} from 'formik'
import {TextField} from 'formik-mui';
import {useRouter} from 'next/navigation'
import SignupData from '@/model/SignupData'
import {signupValidationSchema} from '@/validation/signup'

import {useSnackbarContext} from '@/components/snackbar/SnackbarProvider'

import styles from './page.module.css'

export default function SignupForm() {
  const {showMessage} = useSnackbarContext()

  const router = useRouter()

  const initialValues: SignupData = {
    name: '',
    loginId: '',
    password: ''
  }

  /**
   * フォームsuccessイベント時の処理。
   *
   * @param data フォーム値
   */
  async function onSubmit(data: SignupData) {
    const res = await fetch('/signup/api', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (res.ok) {
      showMessage({
        type: 'success',
        message: 'アカウントを登録しました'
      })

      router.back()
    } else {
      showMessage({
        type: 'error',
        message: 'アカウント登録時にエラーが発生しました'
      })
    }
  }

  /**
   * 前の画面に戻るボタンclickイベント時の処理。
   */
  function onClickPrevButton() {
    router.back()
  }

  return (
    <Formik initialValues={initialValues}
            validationSchema={signupValidationSchema}
            onSubmit={onSubmit}>
      {({submitForm, isSubmitting}) => (
        <Form>
          <Box className={styles.form}>
            <Box component='h1'
                 className={styles.title}>顧客管理システム</Box>
            <Typography className={styles.description}>デモ版</Typography>
            <Typography className={styles.description}>アカウント作成</Typography>
            <Field component={TextField}
                   name="name"
                   label="名前"/>
            <Field component={TextField}
                   name="loginId"
                   label="ログインID"/>
            <Field component={TextField}
                   name="password"
                   type="password"
                   label="パスワード"/>
            <Button variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}>登録</Button>
            <Button onClick={onClickPrevButton}>前の画面に戻る</Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
