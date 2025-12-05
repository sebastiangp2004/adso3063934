<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Pets</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>User Name</th>
                <th>User Document</th>
                <th>User Email</th>
                <th>User Phone</th>
                <th>User Photo</th>


                <th>Pet Name</th>
                <th>Pet Kind</th>
                <th>Pet Breed</th>
                <th>Pet Photo</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($adopts as $adopt)
            <tr>
                <td>{{ $adopt->user->fullname }}</td>
                <td>{{ $adopt->user->document }}</td>
                <td>{{ $adopt->user->email }}</td>
                <td>{{ $adopt->user->phone }}</td>
                <td>
                    <img src="{{ public_path().'/images/'.$adopt->user->photo }}" width="50px">
                </td>

                <td>{{ $adopt->pet->name }}</td>
                <td>{{ $adopt->pet->kind }}</td>
                <td>{{ $adopt->pet->breed }}</td>
                <td>
                    <img src="{{ public_path().'/images/'.$adopt->pet->image }}" width="50px">
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>