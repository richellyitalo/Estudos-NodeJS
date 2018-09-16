## Update Operators
[Link de Update Operators](https://docs.mongodb.com/manual/reference/operator/update/)
Uso:
```
const course = await Course.findByIdAndUpdate({ _id: id}, {
    $set: {
      name: 'Jazico',
      isPublished: false
    }
  }, { new: true });
```