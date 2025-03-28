import client from "~/lib/interceptor";

export async function updateCourse(props: { [k: string]: FormDataEntryValue }) {
    const formData = new FormData();
    formData.append("_method", "PATCH")

    for (const key in props) {
        formData.append(key, props[key]);
    }

    if (props.thumbnail instanceof File)
        formData.append("thumbnail", props.thumbnail);

    const response = await client.post(`api/mentor/courses/${props.courseId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    // const response = await client.patch(`api/mentor/courses/${props.courseId}`, {
    //     title: props.title,
    //     about: props.about,
    //     tags: props.tags,
    //     learning_goals: props.learning_goals,
    //     requirements: props.requirements,
    //     description: props.description,
    //     start_date: props.start_date,
    //     price: props.price,
    // });

    return response;
}

export async function getCourse(courseId: string) {
    const response = await client.get(`api/mentor/courses/${courseId}`);
    return response.data
}