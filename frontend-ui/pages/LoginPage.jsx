import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => navigate("/items"))
      .catch((err) => toast.error("Login failed: " + err.message));
  };

  return (
    <>
       {isLoading && <Loader />}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDhAQEBANEBAVDQ0NDQ0ODQ8QEA4NIBcYIiARGRgkHDQgJBoxIB8fJDEhJSorLi4uIx8zODMsNygtLisBCgoKDg0OGBAQGDcfHR0rKy0rLS0rNy0rLS0rLS0tKy0vLS0tLS0tLS0tLS0tLS0vLS0rLSstLTcrLS03Ny03Lf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAFAAIDBAEGBwj/xABMEAABAwICAwsIBgcHBAMAAAABAAIDBBEGIQUSMQcTIiRBUWGDo7LSMjM0U1RxcnMUI4GRsfAWNVJioaTBJUJDktHh8RWis8JjdIL/xAAZAQADAQEBAAAAAAAAAAAAAAACAwQBBQD/xAAoEQACAgEDAwQCAwEAAAAAAAAAAQIDEQQSMRMhURQiMkEFcTNCYTT/2gAMAwEAAhEDEQA/AAOJsV1zKyVjZ7NG92G9Qm3Ab+6hrcX6Q9f2MHhUOKxx6bqu41DA1dCMFjg58pvPIfbi2v8AX9jB4VMMWV/r+yh8KARhTsamKteBUrH5DjMV13r+yh8Kkbiqt9f2UPhQMNUjQjVa8C3Y/Iebimt9f2UXhUzcUVnruyi8KAsCmamRrj4FynLyGv0mrPXdlF4U8YlrPXdlF4UGapWC/wCP2I9kfAHUn5CpxLWeu7KLwpfpLV+u7KLwoWB+ehYcFvTj4PKyXkKHEtZ67sovCmHEtZ67sovChw/2UZWdOPgNWS8hI4nrfXdlF4VG7FFb67sovChr1A8LOnHwMjOXkKHFVb6/sofCsOxVW+v7KHwoMQmkrNkfAzdLyGXYrrfXdlD4Vg4rrvX9lD4UGSss6cfBu9+Qx+ldd6/sofCnDFlb67sofCgo255dKwtVcfBm5+Q6cVVvr+yh8Kx+lVb6/sofCgoCV0XTj4M3S8m14exLWPqo2umuDr3G9RfsH91JCcMjjsXWdxywpboxUuB9cngHYrHHpuq7jUNJJJJzOSK4qHHpur7jUNDUUI9kJnLux7ArDR0W6FEwKdgToxESY5rU7VT2hPLUzaL3DWBTNCawKUBbgFsyxSNCzAQCCRcZZXKkeQXEgWBJsOboWgmGpFv9VkNTwPz0rTCAhNIVmyhc1eCTK8ihfGbX5L2+1WXhQSLMDosrOCjcpnKNzULQ1MYsgLJ5lhZg0wQshJZCIwTjlb7k0FZWLLDUFML+mRdZ3HJLGFvTIus7jklJf8h9fBVxSOPTdX3Goc1qLYkZeulA/wDj2/A1DgP6Jta7InsfdiYFYjCiaFYjCfFE8mTCI5dN0/UTWnO5Vhr7ZjLk+xGKbIQnhKycF48OaFK0JjQpWhYYZaE8tWGp1l4wjcPz0Jp2K7PQyta15Y7VLQ5rgCRbbdU3Lyww8Y5K71XkKsvH56VC5qLA1MrOaoyFZcMrW5Tn0cyjLVmBiZCGE3TbKYtTSP8AlZg3JEVhX63Rk0VteNwBaHB1ja3PdUnIV34C4MXTb8qdZMJWM1BXC3pkXWdxySbhc8dh6zuOSUd79w+vgZig8dl6vuNVCIA2ucs0RxWR9OmIFvN5D4Goa0qmte1ElnLJmBSsyUetc3AA6Apmn/lOQiRI0BSjYoGKVEAOAUsbRy3GR2c6ibtUrVh4lZstbmz/AKKRrU1n3e5SsCwFmQ1LVUgSLVoKfc69hykZLo+FkjQ5phiBB2ebAXNsbaOZBVlkYDWlhfYch13ZfwXUMJehQfKi7jVzzdGHHeqHfeuZpW+s0dfUpdGLNPeFC8K0WrM9E9rQ4ggG1jYrqnPTKBCaWqwGC4225bcyjeOb8hFgLJEYja+VvfmoXBTOUTkLQaZ6KGjYaimiZNG17d6jyd8IXB8Y6PZTVskUfkgNI+0XsvQejvMRfKj7oXB90b9ZS/DF3QuTopPe0dHUpbUzWHHJRXT3KMroskQUwt6bD1nccklhb02LrO45JSWruUQ4Fig8dm6vuNQ5hRHFPps3V9xqGsKph8URz5ZYYrNNC57g1oc4kiwaCT71VZ/ousblWHG739KlaCT5m4ytwgeRZbaq4bmDXU7JYRU0FuavkaHVDzGDYgMI1rcxBathO5rSftyfcz/RHsQ4igoma0pNz5LG6pcem19i1el3TIC8B7HhpNrhguOnylzupqLPcuDodPTw7PkF6c3OHxt1qZ5kA2iQi9vsCZh/c+llAfOTG02IDTw7cxBC6hSVbJmB8bg5pFwQQU6onbG0veQAASSSAh9Xbjb9m+kqzu+jU27nlKBbXk99mf6IXpfAGo0uge5xzOq8gZcwsFfrd0KFr9WNrnAGxJaDn0WdsR7QOIYatvANnDax1geTMC+zNFv1EFufAHT09j2rk5BPTPjcWva5pBIsQR9vuWAF0nHehBJFv7Bw2i7rAeQA4k7FzhoXRouVscnK1FLqng6/hT0KH5UXcatJxno2WorwyNhN4wNbVOqDru2nmzW74WHE4flRdxqJCFocXAAEixdbOy5UbXXZJo7Tq6tUUzQNG7nQIDp5HNOR1Yy0j3ZtR2fBkL2NY6SQtFreRzW5lY01imnprgu137LM1XWOe0X6Frj90Q62UbdW/K03t/mTk9Tb7kKb01XtY3SW5s3VJgleXZ2a8tDb82QWh6Z0JPSuLZGEDkeGu1D9tl1rQ2MaaoOqSY3/AL+qxv2ZovpPRsNVEWSNa5pHBdYEt/eCOGrtqlixGS09VizWzzu9qgetgxVoN9HO5hB1TwmOF7WPJeyAPC6ikpR3Ihw4vDPSmjvMRfKj/ALg+6K3+0pjcZNiyv8Auhd40d5iL5UfdC4Nuj/rKX4Yu6FyNF/Izp6n4I1YphTnJjiumyNBbC/psQy/xM//AMOSTMKnjsPWdxySju+RRXwPxUeOSiw/w8+fgNQ1oueQIlif06W97fV7PgahgVUPiiSfLJ4DwhfPMDNejcKQCOhgY3YGuts/aK84Q+U34gvSmHPRIfhd3iotf8UU6Je5nHt0iue/SM0bidWN2qwXOQLWla2Ebx7b/q1Xe/nG7LfsNQNhVdPaEf0R3d5s6vuTVj3QyxuJIa9oZcngi2wdCI7pdU5lHZpteRgJBN7Z5INuReTN8Y7qKbqPorfmR/1XPkl6kuTfpjl7Aj+EKhzKyLVJFy1hzPklwyQOIc6NYYbxuH5kf3awXTt+DOXW8TR17SjNanmbzwyD/tK4xUN1ZHt5nub/ABXaq7zMny3/AILi+kQd+l+ZJ+Kg/H/2LfyS+LOs4WPE4flRdxqq4x0uaeAhnluu0HO7QWu4Qz25KzhT0KH5UXcatO3SJXfS2NudX6Ox1rm19Z6RVWp34ZTbY4adNGpl7XukdKZC4hzmEWN5L8t+RUypXqFy7sVg4TeTGsQQRcEZghdP3PsQGeMwyOvIwXBJObcgBmbrmKP4Clc2uYBscWtdt2XU+rrU6239FWjtcLEvJuO6VooTUhktwo9Z9wBc8lti425gz235Nm1d/wAVDiNR8s/iuAzmzj7ykfj5N1tP6KtbHFia+z0Zo/zMXyo+6FwfdG/WUvwxd0LvGj/MRfKj7oXB90f9ZS/DF3QptD/KyrU/BGqOUbhb/ZSOCiculIkiFMKnjsPWdxySWFzx2HIf4ufPwHJKK/5FVXA/FHpsvV9xqGBEcUP47L1fcahgKrg/aiOfLLEHlN+IL0phz0SH4Xd4rzTAeE34gvS2HTxSL4Xd4qHXcIp0fLOKY/H9q1fzG9xqBMKP4/H9q1fzG9xqBNarKvhH9Edvzf7On7kPkzfGO6iu6geKt+ZH/VCtyEcGb4x3UU3UfRW/Mj/qoZf9Rav+ZnOaRjS4a2QuL2tsRzQgYK2IMuQJYwL22a4WuxnmRnDDuNw/Mj2/EF0LF7WzlV/Jfs7DXeZk+W/8FxuvF5pfmSfffauyV3mZPlv/AAXGaonf5vmSfiofx/8AYv8AyPETpOBaoPpNW+bH73YnOwYz+CGboujC9rZ2gkgNY6wJswa5vsQPCGmfo84a48B51Tc5NJc3hbdlgumSMZNHY6rmPb0EFpCVbmi7f9Damr6Nn2cNIJsACSTYAC5J5lN/0WrOYpaojIginksR9yPYi0Sylr4gwnVc+N4BIyJcchkMsl06h81H8tn4Ky7WOEYuKzklp0e9tSeMHA5iWktIIIJBBBBB5lu+5lopzpXTvadQACM2Plg+5BdGaGFZpOojc4hoqJnPsbO1d8IsMiut0NHHTRBjLNY0Zngj7Ss1mpxDYuWHpNN7t74QKxzWCKgnubF0Zaz4vvXB5nXufet33R8S/SJBBE68bDclp8p2YINjay0R5TtFU4Vd/sHVWKdnb6PSmjvMRfKj7oXB90b9ZS/DF3Qu8aO8xF8qPuhcH3Rv1lL8MXdCi0H8rLdV/GjVHn8lQuKsSsINiCDlkQVXculMjiE8K+mw9Z3HLKxhX06HrO45JRWv3FlXBjFPp03V9xqoMA1Sb55WzCv4qPHZur7jULBT4P2oln8mWIDwh8Q+5egtAYmoG0sTXVlK1wa67TOwEG56V56Bvn+CnjSralallm12utvBs+NKlkukqmSN7XsdI0tewhzSNVvLsQobPx96rxqw0KiMdqSJZvLbOg7l+koIBLv00Ud3gt3x4bcW25lEt0TS9NNTBsU8MjtdhtHI1xtnntXLwnsKT6dOzqZG+ofT2YLLHIth2drKqJz3BrQ+O5cQABrDP3IM0pwOapktywTLs8nbavT9GY3gVNOSY3gATM22965dWkGWQgggvcQRyi+33IOxytskuNvIkU6dVZwxmo1ErcZXA95tn/FbBh3Gj6ciOW74rgA5l7dgtm7ZYLXNe+X5soZ4gM/xTp1xsWJIVXbKt5RtWKdLQ1NZTPicCPqBYEEtN3ZG3vXTaHzMfymfguC0cjWzRuOQEjXE5WtddbpcX0TYmAzRAiNgP1jNtveoNXQ0oxis4Onpbk3KUu2TRsNaUiptKVskr2tG+TWu4DWO+7BcqTFeP3TtdFTBzGZhzzk4jnBDlpWl5Q+pne03a6eZzSOVpcc1U1lYqIuSm+SZ3SScUSvdfM5naSefnUTwnB/PZRyEqnJOl3O+0WKKARRg1lICI2Agzx3BsOlcYx7VRy6QkfE9sjC2OzmODgTqoE4qFzlHTpo1Scky2dzsSWB7nguu4uIy5c1Wcnlyjc5NkwIhLCx49D1vccksYWPHoes7jklz737iuvgWLnN+nzaoIH1VgbX8hqFNKI4rHHpuq7jUMaqIPshE13ZbgAJAN/KAy5luuIMLOAp/osMshcyUv1QHZgrSac8JvxBdSxhiGWnpqOOHVBcyVz3FvCyeMgVk5SUopGRScW2aKaOSKRrZo3sOsLtcLG3MjGIYYmuj3mOWMFpyktwjfaLI7prjGjaWqeGiUFocWtA1rybf4IlJRMkrKMPA1RTzP2CxcDkF7q8N/wCgurlfo0xmg6os1xTyllr6wYbW51LojRpNRCyZj2te5pF8tZusBcI9pTFVSyudG1sbWNlEYi3seTllbnRbEbr1+jnaoZeJpLAALfWDJeds+GuTFVDu0+ABiDDkrKiUQQyuja5wBDb8FB6OgllmbC1h1y4BwseCL2uehbjjDEUsdcI4yzVDwHgDM8LYc0zSlQY9IUEkYa0zsgfIA0f3pM16Fs1FZ+0enVDc8fTAFdoOamk+sjeWNdm8NOqQD/soG0M0pc+GGVzMzdovZq2DEekZX6R+juI3t1U1hBv5Jfb8Ec0rSOj3uOKqo4GtjZwXMcHOtfM22j/Rb6iSSzywehFt44RzshzSQ4EOBIIPIrTdGVErdaOKV4AuS0E5c627S9DFI+icZad7zUUsEu8t1Q8XNz96r6f03JDNvUIYxkY1LattYtJFzY5jJGtQ5YUV3AlRGOXJ9jU9E0WtWwQytcA6eNj2nI2LrFWNN4dnE8whgmdG18nCDbjVDijTKsT11BIYTG/f6ZpeGtax+ZN7beVZxFieZtfqM1AxspBbq+WQ4jPPNY7bHPt4DhCG3v5OeVDC1xBBaRcEHn5kdwno6OdlYZAbx0u+MsQOFcBTbocLW1bC0Aa9JBM4AADWdrElSYCP1Wkv/o/+wRTsbq3L/DYwxPBSoMLVE8E07GOLW629gA3e4HYOlBZaGoEohMUglNrRlp1rLe9C6Zmboqqc3VBYJC2wO3WGagwvpEmmra9zWSVLIW6oLQ4MAdYGx96S75rI1VReDXdEYaqfpkDKmnnjje8hxc0ty1SVUxrQMpq18Udw0NjIuRtLQVsuCsZ1UukYYpRHI18jgRqXc0WJ4NzkUB3Snf2nL8EPdCFWT39/AeyO3KNXJWHOWHbAbjly5lGSmOQKQawkR9Nive/1lv8AI5JMwmePQ9b3HJKex9x0F2Fix/HZh8ruNQtrhb8EQxaePTdV3GoW1Mg+yFyXdluA8IHpBWy4i06yrEAaxzN7bI06xB1iTe61aMq1EE2KTeRMspYNwOI2HR8VKI36zXMJfcaps+9ledpgVVRTb27eCxpbrSG4LtbZktOgyU0T87g2Its50fTiA7JHWKn6Rv4D6LfJQ8cZZHGI3C+b7bULxzpRsddSvdwnRRgStbYcIPvZanFiGpY2wkOy1zcmyF1FS97i55JJuSSSlQo75Yc7vbhBXT2lm1FU6drXNBfr6pIva6taW08Jn0j2Nc0wQxR5kHWc117ha5dIOT+nHt/glyff/TbtJYgp52NeYZRUt1SJQ9obrjO9verkeJaaVjBVRSufHG1rXxvawOtye/MrSNf89KeH/npWdGLR7qyTybNpHEJllhdEze2Rb2Y2kDW1mk2JI2oxJiOjmDX1EEjpWsbdzHMaHuHR7yVo0cqnDlrphhC+tNNvyHqzEbXVcEwj1YoXRObGLBxa0n+NkH0rXNlqXThpAMjn6pte2sTb+KqyqrI5FGuK7mdSTCOKdKtq5o3sa5urTwwWcQSS0HP3KvoDTjaRtW1zHOM1PvDdUgap1r3PQhkr1Xltq7De5z6OZZKC27fodGTzu+w9hjE7aQzNljdLDK3VdGLXte/KpdH4up6aslkhgk+iyMY2Wnkcx7jbM9FrrUHlRPcp51xbbKIzl2OmUuMtFUr9+gpJjKc85Izqnoy6Vr9ZiulmqauaWnldvscDYRrM+rc3aT71pzimEpXTS7jd7ZI51ySMhc5dCbdM1lkFbkxIP4SqT9NYLNs7WvwRcWY7ZzJKvhI8eh63uOSSZ8jY8GMW+nzdV3GoW0oni08fm6ruNQkFNg+yFy5J2lW4Hqg1ylZJYpsZCpRCm+2/iswyZqnvyUcuaZvF7AyHZKI5lQtl5FlsvCRKQvaSaywXrMltqgJRZM2k2upN8JtfkAH2Ku2S1+m6TJFqZ5otNepmz2/PKqgeD+eVZujFuJbkmuFVkcsF6iketPKJFK5V3uUkjslA8pcmOiiJ5ULipHlQOKRIdFCcVGSslyYSlNjUjN0tZKdoDrBwcMuEARnzKO6DIWA5hA8eh63uOWE3B+dfB1v/AI3LKVN9xseB+LCPp83VZdW1BiUWxcePzdV3GoO7LI9COL7C2u49pT2uUDSpGuRpgtE+tkkx6hcVi63JmAjHIntfmqcT1IHo4yFuIbijYYDIZQJBI1og1DdzLeXrbPsVcBV4pLhTNd+elMTFNGTy/aolI15F7HaC05DZzJjwjTMwO1slLHJlboVdoyPQCfsWI3I1IHBbJUD3JxeoXuWtnkhjyoXlPcVE8oGxiRGT026VC9PeVE4pMmOihjk0lIlNJSmMRhYJWCVglLbDDeDzx+Hrf/G5YWcJPLtIQk7frb7PVuSSZ5yGjYsTYJ0jJWSvZT3ad7sd/gH9xo/aQs4B0n7L/MU3jSSWKxpGuCMDAelBmKbt6bxrIwHpT2X+YpvGkks6rPbESNwJpP2Xt6fxrAwHpP2bt6fxpJIuozOmiRmBdJ+zdvT+NPGBtJ+zdvT+NYSXldIF1osx4I0iB6N28HiUowZpH2ft4PEkkiV8jHREeMGaR9n7aDxJwwZpD2ft4PEkkjWokC6IimwbpF1rwbGho+ug2c3lKA4K0j7P20HiSSReoke9PEz+hmkfZ/s36DZz+UsHBmkrW+j5Xv56n2/5kklnqpnvTxI3YJ0l7N29P4lE7A+kvZu3p/EkkseokEqIkbsC6T9m7en8ajdgPSfsvb0/jSSQO+RqrQx+AtJ8lLbo+kU+3/Om/oDpT2X+YpvGkkgdzD2Ib+gGlPZf5im8ax+gGlPZf5im8aSS91GbsQUwxgjSUdZE99NqtG+ax3+A/wBxw5HJJJIHNmpH/9k=" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label for="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
              <div className="mt-2">
                <input onChange={({target}) => setUsername(target.value)} id="username" name="username" type="text" autocomplete="text" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input onChange={({target}) => setPassword(target.value)}  id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?
            <a href="/register" className="ms-3 font-semibold text-indigo-600 hover:text-indigo-500">Register</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage;
