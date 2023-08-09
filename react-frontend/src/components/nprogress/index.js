/*
 * @Description:
 * @Author: Devin
 * @Date: 2023-08-10 14:56:26
 */
import React, { useEffect } from 'react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

export default function Nprogress(props) {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [props.path])

  return <div>{props.path}</div>
}
