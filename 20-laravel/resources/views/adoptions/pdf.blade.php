<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All Pets</title>
    <style>
        table {
            border: 2px solid #aaa;
            border-collapse: collapse
        }

        table th,
        table td {
            font-family: sans-serif;
            font-size: 10px;
            border: 2px solid #ccc;
            padding: 4px;
        }

        table tr:nth-child(odd) {
            background-color: #eee;
        }

        table th {
            background-color: #666;
            color: #fff;
            text-align: center;
        }
    </style>
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
                    @php
                    $extension = substr($adopt->user->photo, -4);
                    @endphp
                    @if ($extension != 'webp' && $extension != '.svg')
                    <img src="{{ public_path().'/images/'.$adopt->user->photo }}" width="96px">
                    @else
                    Webp|SVG
                    @endif
                </td>

                <td>{{ $adopt->pet->name }}</td>
                <td>{{ $adopt->pet->kind }}</td>
                <td>{{ $adopt->pet->breed }}</td>
                <td>
                    @php
                    $extension = substr($adopt->pet->image, -4);
                    @endphp
                    @if ($extension != 'webp' && $extension != '.svg')
                    <img src="{{ public_path().'/images/'.$adopt->pet->image }}" width="96px">
                    @else
                    Webp|SVG
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>