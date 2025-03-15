import Swal from "sweetalert2";

type Props = {
    locale: "fa" | "en";
    pathname: string;
    setIsOpen?: (value: boolean) => void;
}

export default async function LogoutFunction({ locale, pathname, setIsOpen }: Props) {
    try {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Accept-Language": locale,
            },
            credentials: "include",
        });

        const result = await res.json();

        if (result.success) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });

            localStorage.clear();

            if (pathname.split("/").length === 2) {
                if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
                    window.location.href = `/${process.env.NEXT_PUBLIC_BASE_URL}`;
                }
                else if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                    window.location.reload();
                }
                else {
                    location.href = `/${process.env.NEXT_PUBLIC_BASE_URL}`;
                }

            } else {
                window.location.assign(window.location.origin);
            }
        } else {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: result.message,
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
        }

    } catch (error) {
        console.log(error);

    } finally {
        if (setIsOpen) {
            setIsOpen(false);
        }
    }
}